db.vaccines.insertMany([
    {"_id":ObjectId("111111111111111111111111"), "name": "Antirrabica", "code": 1234 },
    {"_id":ObjectId("222222222222222222222222"), "name": "Parvovirus", "code": 5678 },
    {"_id":ObjectId("333333333333333333333333"), "name": "Moquillo", "code": 2468 },
    {"_id":ObjectId("444444444444444444444444"), "name": "Pentavalente", "code": 1357 },
])

db.applications.insertMany([
    { "_id":ObjectId("111111111111111111111111"), "vaccine": {"_id": ObjectId("111111111111111111111111")} , "code": 1, "estimated_date": Date("2019-04-05T22:46:44.347Z")},
    { "_id":ObjectId("222222222222222222222222"), "vaccine": {"_id": ObjectId("222222222222222222222222")}, "code": 2, "estimated_date": Date("2019-04-05T22:46:44.347Z")},
    { "_id":ObjectId("333333333333333333333333"), "vaccine": {"_id": ObjectId("333333333333333333333333")}, "code": 3, "estimated_date": Date("2019-04-05T22:46:44.347Z")}
])

db.pets.insertMany([
    {"_id":ObjectId("111111111111111111111111"), "name": "Lola", "date_of_birth": Date("2019-04-05T22:46:44.347Z"), "applications":[{"_id":ObjectId("111111111111111111111111")}]},
    {"_id":ObjectId("222222222222222222222222"), "name": "Tato", "date_of_birth": Date("2019-04-05T22:46:44.347Z"), "applications":[{"_id":ObjectId("222222222222222222222222")}]},
    {"_id":ObjectId("333333333333333333333333"), "name": "Felipe", "date_of_birth": Date("2019-04-05T22:46:44.347Z"), "applications":[{"_id":ObjectId("333333333333333333333333")}]},
])