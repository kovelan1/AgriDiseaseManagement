export const authRoles = {
  sa: ['ROLE_superadmin'], // Only Super Admin has access
  farmer:['ROLE_farmer'], // only farmer
  admin: ['SA', 'ROLE_admin'], // Only SA & Admin has access
  editor: ['SA', 'ROLE_admin', 'ROLE_farmer'], // Only SA & Admin & Editor has access
  guest: ['SA', 'ROLE_admin', 'EDITOR', 'GUEST'] // Everyone has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];