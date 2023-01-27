const summation = (a: number, b: number): number => {
  return a + b;
}

describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(summation(10, 5)).toBe(15);
  });

  it("should return 5 for add(2,3)", () => {
    expect(summation(2, 3)).toBe(5);
  });
});

const request = require("supertest");
const app = require("../../src/index");
import { Response } from 'express';

describe("Test the root path", () => {
  test("It should respond to the GET method", (done) => {
    request(app).get("/")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        done();
    })
  });
});
