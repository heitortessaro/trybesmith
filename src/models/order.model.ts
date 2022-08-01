import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    // https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg
    const result = await this.connection.execute(
      `SELECT o.id AS id,
      o.userId AS userId,
      JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      group by id
      order by userId;`,
    );
    const [rows] = result;
    return rows as Order[];
  }
}