import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it } from "node:test";
import { RolesService } from "./roles.service";

describe("RolesService", () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
