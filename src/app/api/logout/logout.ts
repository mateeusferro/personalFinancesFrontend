async function logout(token: any) {
  try {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/logout", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export default logout;
