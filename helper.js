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
