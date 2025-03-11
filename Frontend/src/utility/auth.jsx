export const getTokenFromCookies = () => {
  const cookies = document.cookie;


  if (!cookies) {
    console.log("No cookies found.");
    return null;
  }

  const cookieArray = cookies.split(';');

  for (let cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    if (name.trim() === 'token') { 
    
      return value;
    }
  }

  console.log("Token not found in cookies.");
  return null;
};

export const isAuthenticated = () => {
  const token = getTokenFromCookies();
  return token !== null;
};