function DiaryGrid({ diaryList, onEdit, onDelete }) {
  return (
    <div className="diary-grid">
      {diaryList.map((diary, i) => (
        <DiaryCard
          key={diary.date}
          diary={diary}
          onEdit={()=>onEdit(i)}
          onDelete={()=>onDelete(i)}
          idx={i}
        />
      ))}
    </div>
  );
}
