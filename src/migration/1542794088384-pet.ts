import {
  MigrationInterface,
  QueryRunner,
  getRepository,
  createQueryBuilder,
  getConnection
} from "typeorm";
import User from "../entity/User";
import Pet from "../entity/Pet";

export class pet1542794088384 implements MigrationInterface {
  petIds = [];

  public async up(queryRunner: QueryRunner): Promise<any> {
    const userIds = await getRepository(User)
      .createQueryBuilder("user")
      .select("user.id")
      .getMany();

    const kinds: Kind[] = ["CAT", "DOG", "HORSE"];
    const pets: Partial<Pet>[] = userIds.map(({ id }: User) => ({
      name: `johhny`,
      kind: kinds[id % 2]
    }));

    const petIds = (await createQueryBuilder()
      .insert()
      .into(Pet)
      .values(pets)
      .execute()).identifiers;

    const connection = await getConnection();
    userIds.forEach(async (userId, i) => {
      connection
        .createQueryBuilder()
        .relation(Pet, "user")
        .of(petIds[i])
        .set(userId);
    });

    this.petIds = petIds;
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const connection = await getConnection();

    await connection
      .createQueryBuilder()
      .delete()
      .from(Pet)
      .where(this.petIds.map(id => `id = ${id}`).join(" OR "))
      .execute();
  }
}
