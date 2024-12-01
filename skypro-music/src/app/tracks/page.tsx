"use client"
import { GetTracks } from "@/api/apiTrack";
import { MainContent } from "@/components/MainContent/MainContent";
import { setTracks } from "@/store/features/trackSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";


export default function TracksPage () {
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await GetTracks();
                dispatch(setTracks(data)); // Диспатчим данные треков в Redux
            }catch (error) {
                if(error instanceof Error) {
                    setError(error.message)
                  }
              }
        };
        fetchTracks(); 
      }, [dispatch]); 

    return (
        <MainContent />
    )
}