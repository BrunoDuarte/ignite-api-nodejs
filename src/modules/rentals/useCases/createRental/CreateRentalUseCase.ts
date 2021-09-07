import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { Rental } from "../../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if (carUnavailable) throw new AppError("The car is unavailable")

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
    if (rentalOpenToUser) throw new AppError("There's a rental in progress for the user")

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    console.log("compare", compare)
    console.log("expected_return_date", expected_return_date)

    if(compare < minimumHour) throw new AppError("Invalid return time")

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }