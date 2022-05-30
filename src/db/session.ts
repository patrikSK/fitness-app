import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../types/db'

export class SessionModel extends DatabaseModel {
	session_id: String
    expires: Date
    data: String
}

export default (sequelize: Sequelize) => {
	SessionModel.init({
        sid: {
			type: DataTypes.STRING(32),
			primaryKey: true,
		},
		expires: {
            type: DataTypes.DATE
        },
		data: {
            type: DataTypes.STRING(50000)
        }

	}, {
		paranoid: true,
		timestamps: true,
		sequelize,
		modelName: 'session'
	})

	return SessionModel
}
