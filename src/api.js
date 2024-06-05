const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login user.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export async function checkOutBook(bookId, token) {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ available: false })
  });
  return response.json();
}

export async function returnBook(bookId, token) {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ available: true })
  });
  return response.json();
}

export async function getUserReservations(token) {
  const response = await fetch(`${API_URL}/reservations`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  console.log('Response Status:', response.status);
  console.log('Response Headers:', response.headers);

  if (response.ok) {
    const data = await response.json();
    console.log('Response Data:', data);
    if (data.reservation) {
      return data.reservation;
    } else {
      throw new Error('Invalid response format');
    }
  } else {
    const errorData = await response.json();
    console.error('Error Response Data:', errorData);
    throw new Error(errorData.message || 'Failed to fetch reservations');
  }
}

export async function fetchReservations(token) {
  const response = await fetch(`${API_URL}/reservations`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('Response Status:', response.status);
  console.log('Response Headers:', response.headers);

  if (response.ok) {
    const data = await response.json();
    console.log('Response Data:', data);
    if (data.books) {
      return data.books;
    } else {
      throw new Error('Invalid response format');
    }
  } else {
    const errorData = await response.json();
    console.error('Error Response Data:', errorData);
    throw new Error(errorData.message || 'Failed to fetch reservations');
  }
}
