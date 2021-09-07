import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Brand",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])

  })

  it("should be able to list all available cars by brand", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_test"
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234X", 
      fine_amount: 60, 
      brand: "Brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "car3"
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category_id", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234X", 
      fine_amount: 60, 
      brand: "Brand_test",
      category_id: "123456789"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456789"
    })

    expect(cars).toEqual([car])
  })

})