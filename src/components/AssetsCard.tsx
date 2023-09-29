import { Card } from "./ui/card";

export default function AssetsCard({ children }: { children: JSX.Element }) {
  return (
    <Card className="w-fit p-3 hover:shadow-lg duration-300 m-1">
      {children}
    </Card>
  )
}