// TODO: Create Real Card Component
import { useUsersStore } from '@/store/usersStore';
import { useEffect } from 'react';


export const Test = () => {
  const { users, loading, error, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users List</h2>
      <button onClick={fetchUsers}>Refresh Users</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};