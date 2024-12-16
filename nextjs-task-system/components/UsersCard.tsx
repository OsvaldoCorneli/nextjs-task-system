import { userWithId } from "@/types/interfaces";

export default function UserCard(props: userWithId) {
  return (
    <>
      <div className="border border-gray-300 shadow-md rounded-lg w-100 flex flex-col items-start p-4 bg-white m-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          ID del Usuario: <span className="font-normal">{props.user_id}</span>
        </h3>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Nombre del Usuario: <span className="font-normal">{props.name}</span>
        </h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Rol del Usuario: <span className="font-normal">{props.role}</span>
        </h3>
      </div>
    </>
  );
}
