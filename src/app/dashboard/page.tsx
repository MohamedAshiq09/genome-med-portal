// "use client";

// import React from "react";
// import { useUser } from "@clerk/nextjs";
// import { 
//   Card, 
//   CardContent, 
//   CardDescription, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card";
// import { 
//   Activity, 
//   Calendar, 
//   FileText, 
//   Search, 
//   User, 
//   MessageSquare 
// } from "lucide-react";

// export default function DashboardPage() {
//   const { user, isLoaded } = useUser();

//   if (!isLoaded) {
//     return <div className="p-8">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           Welcome back, {user?.firstName || "User"}
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300">
//           Your genomic health dashboard provides personalized insights and tools.
//         </p>
//       </div>

//       {/* User profile summary */}
//       <Card className="mb-8 bg-white dark:bg-gray-900">
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center gap-2">
//             <User className="h-5 w-5 text-green-500" />
//             Your Profile
//           </CardTitle>
//           <CardDescription>
//             Personal information and account details
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex-shrink-0">
//               {user?.imageUrl ? (
//                 <img 
//                   src={user.imageUrl} 
//                   alt="Profile" 
//                   className="w-24 h-24 rounded-full border-2 border-green-500"
//                 />
//               ) : (
//                 <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
//                   <User className="h-12 w-12 text-green-500" />
//                 </div>
//               )}
//             </div>
//             <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
//                 <p className="text-gray-900 dark:text-white">
//                   {user?.firstName} {user?.lastName}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
//                 <p className="text-gray-900 dark:text-white">
//                   {user?.primaryEmailAddress?.emailAddress || "Not provided"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</p>
//                 <p className="text-gray-900 dark:text-white truncate">
//                   {user?.id || "Not available"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Sign In</p>
//                 <p className="text-gray-900 dark:text-white">
//                   {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Quick stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Card className="bg-white dark:bg-gray-900">
//           <CardContent className="p-6 flex flex-col items-center">
//             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
//               <Search className="h-6 w-6 text-green-500" />
//             </div>
//             <h3 className="font-medium text-gray-900 dark:text-white text-center">Gene Searches</h3>
//             <p className="text-3xl font-bold text-green-500 mt-2">24</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 30 days</p>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-white dark:bg-gray-900">
//           <CardContent className="p-6 flex flex-col items-center">
//             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
//               <FileText className="h-6 w-6 text-green-500" />
//             </div>
//             <h3 className="font-medium text-gray-900 dark:text-white text-center">Saved Reports</h3>
//             <p className="text-3xl font-bold text-green-500 mt-2">7</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View all</p>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-white dark:bg-gray-900">
//           <CardContent className="p-6 flex flex-col items-center">
//             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
//               <Activity className="h-6 w-6 text-green-500" />
//             </div>
//             <h3 className="font-medium text-gray-900 dark:text-white text-center">Treatment Insights</h3>
//             <p className="text-3xl font-bold text-green-500 mt-2">12</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New recommendations</p>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-white dark:bg-gray-900">
//           <CardContent className="p-6 flex flex-col items-center">
//             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
//               <Calendar className="h-6 w-6 text-green-500" />
//             </div>
//             <h3 className="font-medium text-gray-900 dark:text-white text-center">Next Update</h3>
//             <p className="text-3xl font-bold text-green-500 mt-2">2d</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Database refresh</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent activity */}
//       <Card className="bg-white dark:bg-gray-900">
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center gap-2">
//             <MessageSquare className="h-5 w-5 text-green-500" />
//             Recent Activity
//           </CardTitle>
//           <CardDescription>
//             Your latest interactions with the GenomeMed Portal
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-4">
//             {[
//               {
//                 title: "Gene search for BRCA1",
//                 timestamp: "Today, 10:23 AM",
//                 description: "Searched mutations and variants"
//               },
//               {
//                 title: "Downloaded report on APoe4",
//                 timestamp: "Yesterday, 3:45 PM",
//                 description: "Treatment correlation analysis"
//               },
//               {
//                 title: "AI Consultation",
//                 timestamp: "Apr 3, 2025, 11:12 AM",
//                 description: "Requested gene-symptom analysis"
//               }
//             ].map((activity, index) => (
//               <li key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       {activity.description}
//                     </p>
//                   </div>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {activity.timestamp}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Activity, 
  Calendar, 
  FileText, 
  Search, 
  User, 
  MessageSquare 
} from "lucide-react";
import Header from "@/components/layout/header";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || "User"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your genomic health dashboard provides personalized insights and tools.
          </p>
        </div>

        {/* User profile summary */}
        <Card className="mb-8 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Your Profile
            </CardTitle>
            <CardDescription>
              Personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-2 border-green-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <User className="h-12 w-12 text-green-500" />
                  </div>
                )}
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white">
                    {user?.primaryEmailAddress?.emailAddress || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</p>
                  <p className="text-gray-900 dark:text-white truncate">
                    {user?.id || "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Sign In</p>
                  <p className="text-gray-900 dark:text-white">
                    {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <Search className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-center">Gene Searches</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">24</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-center">Saved Reports</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">7</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View all</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-center">Treatment Insights</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">12</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New recommendations</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-center">Next Update</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">2d</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Database refresh</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest interactions with the GenomeMed Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  title: "Gene search for BRCA1",
                  timestamp: "Today, 10:23 AM",
                  description: "Searched mutations and variants"
                },
                {
                  title: "Downloaded report on APoe4",
                  timestamp: "Yesterday, 3:45 PM",
                  description: "Treatment correlation analysis"
                },
                {
                  title: "AI Consultation",
                  timestamp: "Apr 3, 2025, 11:12 AM",
                  description: "Requested gene-symptom analysis"
                }
              ].map((activity, index) => (
                <li key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}