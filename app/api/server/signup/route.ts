import PocketBase from "pocketbase";
const adminUsername = "dawitabrham0021@gmail.com";
const adminPassword = "Dawit0945557307";
const pb = new PocketBase("http://127.0.0.1:8090");
export async function GET(request: Request) {
  return new Response(JSON.stringify({ name: "Dawit" }));
}

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, name } = body;
  await pb.admins.authWithPassword(adminUsername, adminPassword);
  const data = {
    password: password,
    email: username,
    name: name,
  };
  await pb.collection("file_uploader").create(data);
  pb.authStore.clear();
  return new Response(JSON.stringify({ user: "Dawit" }));
}
