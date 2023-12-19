import { chargeService } from "./charge.service";
import {
  BadRequestError,
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  UseBefore,
} from "routing-controllers";
import { Charge } from "./charge.model";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { CreateChargeDto, createChargeScheme } from "./dto/create-charge.dto";
import { UpdateChargeDto } from "./dto/update-charge.dto";

@JsonController("/charge")
@UseBefore(AuthMiddleware)
export class ChargeController {
  @Get()
  async findAll(): Promise<Charge[]> {
    return (await chargeService.getCharges()).map((charge) =>
      charge.toObject()
    );
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Charge> {
    return (await chargeService.getChargeById(id)).toObject();
  }

  @Patch("/:id")
  async updateOne(
    @Body() updateChargeDto: UpdateChargeDto,
    @Param("id") id: string
  ): Promise<Charge> {
    const teste = await chargeService.updateCharge(updateChargeDto, id);

    const bla = teste.toObject();

    return bla;
  }

  @Post()
  async create(
    @Body() createChargeDto: CreateChargeDto
  ): Promise<Charge | BadRequestError> {
    try {
      const { value } = createChargeScheme.parse(createChargeDto);

      return (
        await chargeService.createCharge({ value, installments: null })
      ).toObject();
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }
}
