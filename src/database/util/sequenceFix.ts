import { QueryTypes, Sequelize } from "sequelize";
import fs from 'fs';

/** Function generating SQL queries to set all auto-increments at valid positions,
 * so even after importing external data into the database, numeration starts from the next valid index
 * @param sequelize sequelize instance
 */
const sequenceFix = async (sequelize: Sequelize) => {
    const queryText = fs.readFileSync(__dirname + '/generate_commands.sql', 'utf-8');
    const results = await sequelize.query(
        queryText,
        { type: QueryTypes.SELECT }
    );

    for (const result of results) {
        await sequelize.query(
            result['?column?'],
        );
    }
}

export default sequenceFix;