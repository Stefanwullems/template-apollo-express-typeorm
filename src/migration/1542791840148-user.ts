import {
  MigrationInterface,
  QueryRunner,
  createQueryBuilder,
  getRepository
} from "typeorm";
import User from "../entity/User";

export class user1542791840148 implements MigrationInterface {
  users: Partial<User>[] = [
    { name: "Stefan Wullems" },
    { name: "Justus Wullems" },
    { name: "Claudio Silva" },
    { name: "Koen Vos" }
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    await createQueryBuilder()
      .insert()
      .into(User)
      .values(this.users)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const userEntities = await getRepository(User)
      .createQueryBuilder("user")
      .where(this.users.map(user => `name = '${user.name}'`).join(" OR "))
      .getMany();

    await createQueryBuilder()
      .delete()
      .from(User)
      .where(userEntities.map(user => `id = ${user.id}`).join(" OR "))
      .execute();
  }
}
