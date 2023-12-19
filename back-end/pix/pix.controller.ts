import { pixService } from "./pix.service";
import { CreatePixDto, createPixSchema } from "./dto/create-pix.dto";
import {
  BadRequestError,
  Body,
  Get,
  JsonController,
  Param,
  Post,
  UseBefore,
} from "routing-controllers";
import { Pix } from "./pix.model";
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
    return (await pixService.getPixById(id)).toObject();
  }

  @Post()
  async create(
    @Body() createPixDto: CreatePixDto
  ): Promise<Pix | BadRequestError> {
    try {
      const { creditParty, debitParty, value } =
        createPixSchema.parse(createPixDto);

      return (
        await pixService.createPix({ creditParty, debitParty, value })
      ).toObject();
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }
}
