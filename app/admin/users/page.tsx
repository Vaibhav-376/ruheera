"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUserRole } from "@/app/actions/user";
import { Trash2, Shield, ShieldOff } from "lucide-react";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(userId);
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
  };

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    const actionText = newRole === "ADMIN" ? "promote to Admin" : "demote to User";
    
    if (!window.confirm(`Are you sure you want to ${actionText} this account?`)) {
      return;
    }

    try {
      await updateUserRole(userId, newRole);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Failed to update user role");
    }
  };

  if (loading) return <div className="text-text-secondary">Loading users...</div>;
  if (error) return <div className="text-[#c92a2a]">{error}</div>;

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium mb-8 text-text-primary">User Management</h1>
      
      <div className="bg-bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-bg-secondary text-sm font-medium uppercase tracking-widest text-text-secondary">
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 w-[100px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border-color last:border-0 hover:bg-bg-secondary transition-colors">
                <td className="p-4 font-body text-text-primary">{user.email}</td>
                <td className="p-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${user.role === 'ADMIN' ? 'bg-brand-gold-dark text-black' : 'bg-bg-secondary text-text-secondary border border-border-color'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleRoleToggle(user.id, user.role)}
                    disabled={user.email === "admin@ruheera.com" || user.id === session?.user?.id}
                    className={`${user.role === 'ADMIN' ? 'text-brand-gold-dark hover:text-yellow-600' : 'text-gray-500 hover:text-gray-700'} transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
                    title={
                      user.email === "admin@ruheera.com" 
                        ? "Cannot modify primary admin" 
                        : user.id === session?.user?.id 
                          ? "Cannot modify your own role" 
                          : user.role === "ADMIN" ? "Make User" : "Make Admin"
                    }
                  >
                    {user.role === "ADMIN" ? <ShieldOff size={20} strokeWidth={1.5} /> : <Shield size={20} strokeWidth={1.5} />}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={user.email === "admin@ruheera.com" || user.id === session?.user?.id}
                    className="text-[#c92a2a] hover:text-red-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title={
                      user.email === "admin@ruheera.com" 
                        ? "Cannot delete primary admin" 
                        : user.id === session?.user?.id 
                          ? "Cannot delete yourself" 
                          : "Delete user"
                    }
                  >
                    <Trash2 size={20} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
