import { Outlet } from "@remix-run/react";

export default function PostsRoute() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      Oh no, something went wrong!
      <pre>{error.message}</pre>
    </div>
  );
}
