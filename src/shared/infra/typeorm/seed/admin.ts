import { v4 as uuidv4 } from "uuid"
import { hash } from "bcrypt"

import createConnection from "../index"

async function create(): Promise<void> {

  
  const id = uuidv4()
  const password = await hash("admin", 8)
  
  console.log("inserting user admin")
  console.log(password)
  console.log(id)
  
  try {

    const connection = await createConnection("localhost")

    await connection.query(
      `
        INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license, avatar) 
        VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'ASDFG', 'my_avatar')
      `
    )

    await connection.close()
    
    } catch (error) {
      console.log(error)
    }

    
}

create().then(() => console.log("User Admin created!"))