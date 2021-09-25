//Find the id
export async function getProductById(client, id) {
    const result = await client.db("product").collection("productdbvalue").findOne({ id: id });
    console.log("Successfully Connected", result);
    return result;
}
//delete data by id
export async function deleteProductById(client, id) {
    const result = await client.db("product").collection("productdbvalue").deleteOne({ id: id });
    console.log("Successfully Connected", result);
    return result;
}
export async function getProducts(client, filter) {
    const result = await client.db("product").collection("productdbvalue").find(filter).toArray();
    console.log("Successfully Connected", result);
    return result;
}

export async function insertProduct(client, product) {
    const result = await client.db("product").collection("productdbvalue").insertMany(product);
    console.log("Inserted successfully", result);
    return result;
}
export async function insertUser(client, user) {
    const result = await client.db("product").collection("user").insertOne(user);
    console.log("Inserted successfully", result);
    return result;
}
export async function getUsers(client, filter) {
    const result = await client.db("product").collection("user").find(filter).toArray();
    console.log("Successfully Connected", result);
    return result;
}

export async function getUser(client, filter) {
    const result = await client.db("product").collection("user").findOne(filter);
    console.log("Successfully Connected", result);
    return result;
}

export async function updateProductById(client, id, newproduct){
    const result = await client.db("product").collection("productdbvalue").updateOne({ id: id }, {$set: newproduct});
    console.log("Successfully Updated", result);
    return result;
}

export async function replaceProductById(client, id, newproduct){
    const result = await client.db("product").collection("productdbvalue").replaceOne({ id: id },newproduct);
    console.log("Successfully Updated", result);
    return result;
}


//poll data

//Find the id
export async function getPollById(client, id) {
    const result = await client.db("contestants").collection("poll").findOne({ id: id });
    console.log("Successfully Connected", result);
    return result;
}
//delete data by id
export async function deletePollById(client, id) {
    const result = await client.db("contestants").collection("poll").deleteOne({ id: id });
    console.log("Successfully Connected", result);
    return result;
}
export async function getPolls(client, filter) {
    const result = await client.db("contestants").collection("poll").find(filter).toArray();
    console.log("Successfully Connected", result);
    return result;
}

export async function insertPoll(client, product) {
    const result = await client.db("contestants").collection("poll").insertMany(product);
    console.log("Inserted successfully", result);
    return result;
}

export async function updatePollById(client, id, newproduct){
    const result = await client.db("contestants").collection("poll").updateOne({ id: id }, {$set: newproduct});
    console.log("Successfully Updated", result);
    return result;
}

export async function replacePollById(client, id, newproduct){
    const result = await client.db("contestants").collection("poll").replaceOne({ id: id },newproduct);
    console.log("Successfully Updated", result);
    return result;
}


