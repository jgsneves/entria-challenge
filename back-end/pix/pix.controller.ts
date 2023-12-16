import { pixService } from "./pix.service";
import { CreatePixDto, createPixSchema } from "./dto/create-pix.dto";
import {
  BadRequestError,
  Body,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
  UseBefore,
} from "routing-controllers";
import { Pix } from "./pix.model";
import mongoose from "../services/mongo-db-service/mongo-db.service";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

@JsonController("/pix")
@UseBefore(AuthMiddleware)
export class PixController {
  @Get()
  async findAll(): Promise<Pix[]> {
    return (await pixService.getPixes()).map((pix) => pix.toObject());
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Pix> {
    const pix = await pixService.getPixById(id);

    if (!pix) throw new NotFoundError();

    return pix.toObject();
  }

  @Post()
  async create(
    @Body() createPixDto: CreatePixDto
  ): Promise<Pix | BadRequestError> {
    try {
      const { creditParty, debitParty, value } =
        createPixSchema.parse(createPixDto);

      const datetime = new Date().toISOString();
      const id = new mongoose.Types.ObjectId().toString();

      return (
        await pixService.createPix(
          { datetime, creditParty, debitParty, value },
          id
        )
      ).toObject();
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }
}
