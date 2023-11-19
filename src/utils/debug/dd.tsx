export const dd = (data: any) => {
  return (
    <pre
      className=""
      style={{ background: "black", color: "lightgreen", padding: 10 }}
    >
      {JSON.stringify(data, null, "\t")};
    </pre>
  );
};
