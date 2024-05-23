
import React, { useMemo } from 'react';

interface Job {
    work_year: number;
    experience_level: string;
    employment_type: string;
    job_title: string;
    salary: number;
    salary_currency: string;
    salary_in_usd: number;
    employee_residence: string;
    remote_ratio: number;
    company_location: string;
    company_size: string;
}

interface AggregatedJobTitlesTableProps {
    year: number;
    jobData: Job[];
}

const AggregatedJobTitlesTable: React.FC<AggregatedJobTitlesTableProps> = ({ year, jobData }) => {
    const aggregatedData = useMemo(() => {
        return jobData
            .filter(job => job.work_year === year)
            .reduce((acc, job) => {
                if (!acc[job.job_title]) {
                    acc[job.job_title] = 0;
                }
                acc[job.job_title] += 1;
                return acc;
            }, {} as Record<string, number>);
    }, [year, jobData]);

    const rows = Object.keys(aggregatedData).map(jobTitle => ({
        jobTitle,
        count: aggregatedData[jobTitle],
    }));

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Job Titles for {year}</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="p-2 border">Job Title</th>
                        <th className="p-2 border">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.jobTitle}>
                            <td className="p-2 border">{row.jobTitle}</td>
                            <td className="p-2 border">{row.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AggregatedJobTitlesTable;
