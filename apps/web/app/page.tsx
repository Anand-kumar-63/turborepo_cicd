
import { prisma } from "@repo/db";
type userobj = {
  username: string,
  password: string
}
export default async function Home() {
  const data = await prisma.user.findMany();
  return (
    <div>
      {
        data.map((item: userobj) => (
          <p>{item.username}</p>
        ))
      }
    </div>
  );
}
