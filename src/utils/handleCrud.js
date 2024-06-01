const handleCRUD = async (
  URL,
  method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  setter
) => {
  try {
    const res = await fetch(URL, method);
    console.log(method);

    // const data = await res.json();

    const data = await res.json();

    if (!res.ok) {
      return;
    }
    setter((prev) => ({
      ...prev,
      data,
      error: false,
    }));
  } catch (err) {
    const { status } = err;
    setter((prev) => ({
      ...prev,
      error: true,

      status,
    }));
  } finally {
    setter((prev) => ({
      ...prev,
      done: true,
      loading: false,
    }));
  }

  setTimeout(() => {
    setter((prev) => ({ ...prev, loading: false }));
  }, 2000);
};
export default handleCRUD;
