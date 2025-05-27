'use client';

import { ChevronDown, Download, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Application = {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  status: string;
  appliedDate: string;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, you would fetch from your API
    const fetchApplications = () => {
      const dummyApplications = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          jobTitle: 'Frontend Developer',
          status: 'New',
          appliedDate: '2023-05-15'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '987-654-3210',
          jobTitle: 'UI/UX Designer',
          status: 'Reviewed',
          appliedDate: '2023-05-10'
        },
        // Add more dummy data or fetch from API
      ];
      setApplications(dummyApplications);
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[var(--foreground)]/50" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary)]/90 transition">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--secondary)]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--secondary)]/20">
            <thead className="bg-[var(--secondary)]/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--secondary)]/20">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-[var(--secondary)]/10 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[var(--foreground)]">{application.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[var(--foreground)]">{application.email}</div>
                    <div className="text-sm text-[var(--foreground)]/70">{application.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[var(--foreground)]">{application.appliedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 p-1 rounded">
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}