export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <p>profile page {params?.id}</p>
    </div>
  );
}
