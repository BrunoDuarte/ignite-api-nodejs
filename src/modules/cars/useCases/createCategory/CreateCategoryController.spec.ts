import { app } from "@shared/infra/http/app"
import { v4 as uuidv4 } from "uuid"
import request from "supertest"
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm"
import { hash } from "bcrypt"

let connection: Connection
describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = await hash("admin", 8)

    await connection.query(
      `
        INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license, avatar) 
        VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'ASDFG', 'my_avatar')
      `
    )
  })

  afterAll(async() => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
    .post('/categories')
    .send({
      name: "Category Supertest Name",
      description: "Category Supertest Description"
    })
    .set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(201)
  })

  it("should not be able to create a new category with an existing name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
    .post('/categories')
    .send({
      name: "Category Supertest Name",
      description: "Category Supertest Description"
    })
    .set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(400)
  })
})