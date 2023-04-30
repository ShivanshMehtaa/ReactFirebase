import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { auth, db, storage } from "./firebase";
//getdocs becoz saare docs aajaye
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
// import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState(" ");
  const [movieReleaseDate, setMovieReleaseDate] = useState(0);
  const [hasOscar, setHasOscar] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(" ");

  // const [fileUpload, setFileUpload] = useState(null);

  const collectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      //READ THE DATA
      // SET THE MOVIE LIST STATE EQUAL TO THE DATA
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
        // console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieList();
  }, [collectionRef]);

  const onSubmitMovie = async () => {
    try {
      await addDoc(collectionRef, {
        title: newMovieTitle,
        releaseDate: movieReleaseDate,
        recievedAnoscar: hasOscar,
        userID: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title:updateTitle});
  };

  // const uploadFiles = async()=>{
  //   if (!fileUpload) return;
  //   const filesFolderRef = ref(storage, `projectFIles/${fileUpload.name}`);
  //   await uploadBytes(filesFolderRef, fileUpload);
  // }

  return (
    <div className="App">
      <Auth />
      <br />
      <div>
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={hasOscar}
          onChange={(e) => setHasOscar(e.target.checked)}
        />
        <label htmlFor="">Oscar?</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              type="text"
              name=""
              id=""
              placeholder="New Title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={()=>updateMovieTitle(movie.id)}>UpdateTitle</button>
          </div>
        ))}
      </div>

      {/* <div>
        <input type="file" name="" id="" placeholder="Upload file"  onChange={(e)=>setFileUpload(e.target.files)}/>
        <button onClick={uploadFiles}>Upload File</button>
      </div> */}
    </div>
  );
}
export default App;
