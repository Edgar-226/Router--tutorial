import { Form, useLoaderData} from "react-router-dom";
import { getContact } from "../../contacts";
import { useState } from "react";



export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
  }

export default function Contact() {
    const { contact } = useLoaderData();

    const [confirmarEliminar, setConfirmarEliminar] = useState(false);
    const manejarEnvioFormulario = (event) => {
        if (!confirmarEliminar) {
            event.preventDefault();
        }
    };

   

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={manejarEnvioFormulario}
                    >
                        <button type="button" onClick={() =>setConfirmarEliminar(true)}>Delete</button>
                        {confirmarEliminar && (
                            <div>
                                <p>Por favor, confirma que deseas eliminar este registro.</p>
                                <button type="submit">Confirmar</button>
                                <button type="button" onClick={() => setConfirmarEliminar(false)}>Cancelar</button>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}