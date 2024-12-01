import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import trackReducer from '@/store/features/trackSlice';
import { authReducer } from '@/store/features/authSlice';
import { Bar } from "@/components/Bar/Bar";
import '@testing-library/jest-dom';


// Мокаем аудио-объект для тестов
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: jest.fn(),
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: jest.fn(),
});

describe('Bar Component', () => {
    const mockStore = configureStore({
        reducer: {
          tracksSlice: trackReducer,
          auth: authReducer,
        },
        preloadedState: {
          tracksSlice: {
            currentTrack: {
              _id: 1,
              name: 'Test Track',
              author: 'Test Author',
              track_file: 'test.mp3',
              album: 'Test Album',
              duration_in_seconds: 180,
              genre: ['Test Genre'],
              release_date: '2024-01-01',
              staredUser: [],
            },
            isShuffle: false,
            isPlaying: false,
            currentPlaylist: [],
            tracks: [],
            shuffleTrackList: [],
            currentTrackIndex: 0,
            likedTracks: [],
            defaultTracks: [],
            favoriteTracks: [],
          },
          auth: {
            tokens: {
              access: 'mockAccessToken',
              refresh: 'mockRefreshToken', 
            },
            username: 'testUser',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
            authState: false, 
          },
        },
      });      
      

  const renderWithProvider = (component: JSX.Element) => {
    return render(<Provider store={mockStore}>{component}</Provider>);
  };

  test('renders Bar component with track information', () => {
    renderWithProvider(<Bar />);
  
    // Проверяем, что название трека отображается
    const trackName = screen.getByText(/Test Track/i);
    expect(trackName).toBeInTheDocument();
  
    // Проверяем, что автор трека отображается
    const trackAuthor = screen.getByText(/Test Author/i);
    expect(trackAuthor).toBeInTheDocument();
  });
  
  test('toggles play/pause on click', () => {
    renderWithProvider(<Bar />);
  
    const playButton = screen.getByRole('button', { name: /play/i });
  
    // Эмулируем клик по кнопке Play
    fireEvent.click(playButton);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  
    // Эмулируем повторный клик по кнопке Pause
    fireEvent.click(playButton);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  test('toggles shuffle state on click', () => {
    renderWithProvider(<Bar />);
  
    const shuffleButton = screen.getByRole('button', { name: /shuffle/i });
  
    // Проверяем начальное состояние
    expect(shuffleButton).not.toHaveClass('playerBtnShuffleActive');
  
    // Эмулируем клик для активации shuffle
    fireEvent.click(shuffleButton);
    expect(shuffleButton).toHaveClass('playerBtnShuffleActive');
  });

  test('changes volume on slider change', () => {
    renderWithProvider(<Bar />);
  
    const volumeSlider = screen.getByRole('slider', { name: /volume/i }) as HTMLInputElement;
  
    // Эмулируем изменение значения громкости
    fireEvent.change(volumeSlider, { target: { value: '50' } });
  
    // Проверяем, что volume обновлен
    expect(volumeSlider.value).toBe('50');
  });
});
