import { Test, TestingModule } from "@nestjs/testing";
import { RolesController } from "./roles.controller";
import { beforeEach, describe, it } from "node:test";

describe("RolesController", () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
