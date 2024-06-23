
// Mock react-router-dom and react-redux
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: jest.fn(),
  }));
  jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => jest.fn()), // Mock useDispatch to return a mock dispatch function
  }));
  
  // Mock your LoginUser API call
  jest.mock('D:/websites/movie review app/frontend/src/apis/user.js', () => ({
    LoginUser: jest.fn(),
  }));
  
  // Mock localStorage
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      }
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
  