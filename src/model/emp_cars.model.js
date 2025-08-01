"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emp_car_model = void 0;
const base_database_1 = __importDefault(require("../config/base.database"));
class emp_car_model {
    // Create EmpCar
    static create_emp_car(empCar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
            INSERT INTO emp_cars 
              (emp_id, car_brand, model, license_plate, car_image)
            VALUES (?, ?, ?, ?, ?)
          `;
                const values = [
                    empCar.emp_id,
                    empCar.car_brand,
                    empCar.model,
                    empCar.license_plate,
                    empCar.car_image
                ];
                // Execute the query and get the result
                const [result] = yield base_database_1.default.execute(query, values);
                // If the result is of type ResultSetHeader, access the insertId
                if ('insertId' in result) {
                    return result.insertId; // Return the insertId for further use (e.g., in the controller)
                }
                // If for some reason insertId doesn't exist, handle the failure
                throw new Error("Failed to retrieve insertId from emp_car insertion");
            }
            catch (error) {
                console.error("Error inserting emp_car:", error);
                throw new Error("Failed to create emp_car");
            }
        });
    }
    // Show All EmpCars
    static show_all_emp_cars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM emp_cars';
                const [rows] = yield base_database_1.default.execute(query);
                return rows; // Returning the fetched emp_cars
            }
            catch (error) {
                console.error("Error fetching emp_cars:", error);
                throw new Error("Failed to fetch emp_cars");
            }
        });
    }
    static get_emp_car_by_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query to get the emp_car by its ID
                const query = `SELECT * FROM emp_cars WHERE id = ?`;
                // Execute query
                const [rows] = yield base_database_1.default.execute(query, [id]);
                // If the result is not empty, return the first row
                if (rows.length > 0) {
                    return rows[0];
                }
                else {
                    return null; // If no record found
                }
            }
            catch (error) {
                console.error("Error fetching emp_car details:", error);
                throw new Error("Failed to fetch emp_car details.");
            }
        });
    }
    //NOTE - get_emp_car_by_emp_id
    static get_emp_car_by_emp_id(emp_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM emp_cars WHERE emp_id = ?`;
                const [rows] = yield base_database_1.default.execute(query, [emp_id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                else {
                    return null; // No car found for this emp_id
                }
            }
            catch (error) {
                console.error("Error fetching emp_car by emp_id:", error);
                throw new Error("Failed to fetch emp_car by emp_id");
            }
        });
    }
    static update_emp_car(empId, empCar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // First, check if emp_cars record exists for this emp_id
                const [rows] = yield base_database_1.default.execute("SELECT id FROM emp_cars WHERE emp_id = ?", [empId]);
                if (!rows || rows.length === 0) {
                    throw new Error(`emp_car with emp_id ${empId} does not exist`);
                }
                // Build the dynamic SET clause
                const fields = [];
                const values = [];
                if (empCar.car_brand !== undefined) {
                    fields.push("car_brand = ?");
                    values.push(empCar.car_brand);
                }
                if (empCar.model !== undefined) {
                    fields.push("model = ?");
                    values.push(empCar.model);
                }
                if (empCar.license_plate !== undefined) {
                    fields.push("license_plate = ?");
                    values.push(empCar.license_plate);
                }
                if (empCar.car_image !== undefined) {
                    fields.push("car_image = ?");
                    values.push(empCar.car_image);
                }
                // Always update updated_at
                fields.push("updated_at = NOW()");
                if (fields.length === 1) {
                    throw new Error("No valid fields provided for update");
                }
                const query = `
        UPDATE emp_cars 
        SET ${fields.join(", ")} 
        WHERE emp_id = ?
      `;
                values.push(empId);
                const [result] = yield base_database_1.default.execute(query, values);
                return result;
            }
            catch (error) {
                console.error("Error updating emp_car:", error);
                throw error; // Let controller handle message and status
            }
        });
    }
    static update_employee_car_image(id, cloudinaryUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the employee's car exists before updating
                const checkQuery = "SELECT id FROM emp_cars WHERE id = ?";
                const [rows] = yield base_database_1.default.execute(checkQuery, [id]);
                if (rows.length === 0) {
                    console.log("car_image car not found with ID:", id);
                    return { success: false, message: "car_image car not found" };
                }
                const query = `UPDATE emp_cars SET car_image = ? WHERE id = ?`;
                const values = [cloudinaryUrl, id];
                const [updateResult] = yield base_database_1.default.execute(query, values);
                const affectedRows = updateResult.affectedRows;
                if (affectedRows === 0) {
                    return { success: false, message: "Failed to update car avatar" };
                }
                console.log("Employee car avatar updated successfully for ID:", id);
                return { success: true, message: "Car avatar updated successfully" };
            }
            catch (error) {
                console.error("Error updating employee car avatar:", error);
                throw new Error("Failed to update employee car avatar");
            }
        });
    }
    // Delete EmpCar
    static delete_emp_car(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'DELETE FROM emp_cars WHERE id = ?';
                const [result] = yield base_database_1.default.execute(query, [id]);
                return result; // Return the result of the deletion
            }
            catch (error) {
                console.error("Error deleting emp_car:", error);
                throw new Error("Failed to delete emp_car");
            }
        });
    }
}
exports.emp_car_model = emp_car_model;
