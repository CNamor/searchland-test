import { db } from "../db";
import { userService } from "../services/userService";
import { users } from "../schema";

jest.mock("../db");

describe("userService", () => {
  const mockInsert = db.insert as jest.Mock;
  const mockSelect = db.select as jest.Mock;
  const mockUpdate = db.update as jest.Mock;
  const mockDelete = db.delete as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("createUser", () => {
    it("should create a user and return the result", async () => {
      const userData = { name: "John Doe", email: "john.doe@example.com" };
      const expectedUser = [
        { id: 1, ...userData, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockInsert.mockReturnValueOnce({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce(expectedUser),
      });

      const result = await userService.createUser(userData);
      expect(result).toEqual(expectedUser);
      expect(mockInsert).toHaveBeenCalledWith(users);
    });
  });

  describe("getUsers", () => {
    it("should return paginated users and total count", async () => {
      const page = 1;
      const pageSize = 10;
      const expectedUsers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
      ];
      const totalCountResult = [{ count: 1 }];

      mockSelect.mockReturnValueOnce({
        from: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce(expectedUsers),
      });

      mockSelect.mockReturnValueOnce({
        from: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce(totalCountResult),
      });

      const result = await userService.getUsers(page, pageSize);
      expect(result).toEqual({ results: expectedUsers, totalCount: 1 });
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const expectedUser = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      };

      mockSelect.mockReturnValueOnce({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce([expectedUser]),
      });

      const result = await userService.getUserById(1);
      expect(result).toEqual(expectedUser);
    });

    it("should return undefined if no user is found", async () => {
      mockSelect.mockReturnValueOnce({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce([]),
      });

      const result = await userService.getUserById(999);
      expect(result).toBeUndefined();
    });
  });

  describe("updateUser", () => {
    it("should update a user and return the updated user", async () => {
      const userId = 1;
      const updatedData = {
        name: "Updated Name",
        email: "updated@example.com",
      };
      const expectedUser = [
        { id: userId, ...updatedData, updatedAt: new Date() },
      ];

      mockUpdate.mockReturnValueOnce({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce(expectedUser),
      });

      const result = await userService.updateUser(userId, updatedData as any);
      expect(result).toEqual(expectedUser);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return the result", async () => {
      const userId = 1;
      const expectedDeletedUser = [
        { id: userId, name: "John Doe", email: "john.doe@example.com" },
      ];

      mockDelete.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce(expectedDeletedUser),
      });

      const result = await userService.deleteUser(userId);
      expect(result).toEqual(expectedDeletedUser);
    });
  });
});
