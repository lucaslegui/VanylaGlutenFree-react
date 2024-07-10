import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="text-center text-lg-start text-muted">
            <section className="footer">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3 text-secondary"></i>Vanyla Cakes
                            </h6>
                            <p>
                                Pastelería Gluten Free
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Datos del Proyecto
                            </h6>
                            <p>
                                Alumno: Lucas Leguizamón
                            </p>
                            <p>
                                Materia: Aplicaciones Hibridas
                            </p>
                            <p>
                                Prof.: Camila Belen Marcos Galbán
                            </p>
                            <p>
                                Año: 2024
                            </p>
                            <p>
                                Comisión: DMN4BP
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4">
                © 2024 Vanyla Cakes - Todos los derechos reservados.
            </div>
        </footer>
    );
};


export {FooterComponent};