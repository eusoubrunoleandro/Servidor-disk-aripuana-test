const config = (tableName) => {
    return {
        timestamps: true,
        tableName: tableName,
        underscored: true
    }
}

module.exports = config;