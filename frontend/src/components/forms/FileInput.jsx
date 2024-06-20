function FileInput() {
  function handleChange(e) {
    console.log(e);
  }
  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleChange}
      />
    </div>
  );
}

export default FileInput;
