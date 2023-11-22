export const dd = (data: any) => {
  return (
    <pre
      className="w-full overflow-scroll"
      style={{ background: "black", color: "lightgreen", padding: 10 , width:"100%", overflow:"auto" }}
    >
      {JSON.stringify(data, null, "\t")};
    </pre>
  );
};
