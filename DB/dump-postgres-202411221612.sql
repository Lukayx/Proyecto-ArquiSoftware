--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-11-22 16:12:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 24929)
-- Name: Publicc; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Publicc";


--
-- TOC entry 853 (class 1247 OID 33155)
-- Name: estadoclientetipo; Type: TYPE; Schema: Publicc; Owner: -
--

CREATE TYPE "Publicc".estadoclientetipo AS ENUM (
    'Baneado',
    'NoBaneado'
);


--
-- TOC entry 856 (class 1247 OID 33160)
-- Name: estadoproductotipo; Type: TYPE; Schema: Publicc; Owner: -
--

CREATE TYPE "Publicc".estadoproductotipo AS ENUM (
    'EnVenta',
    'Agotado'
);


--
-- TOC entry 225 (class 1255 OID 33248)
-- Name: check_admin_no_duplicado(); Type: FUNCTION; Schema: Publicc; Owner: -
--

CREATE FUNCTION "Publicc".check_admin_no_duplicado() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM cliente WHERE cliente.id_usuario = NEW.id_usuario) THEN
        RAISE EXCEPTION 'El usuario ya está registrado como cliente y no puede ser admin';
    END IF;
    RETURN NEW;
END;
$$;


--
-- TOC entry 224 (class 1255 OID 33246)
-- Name: check_cliente_no_duplicado(); Type: FUNCTION; Schema: Publicc; Owner: -
--

CREATE FUNCTION "Publicc".check_cliente_no_duplicado() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM admin WHERE admin.id_usuario = NEW.id_usuario) THEN
        RAISE EXCEPTION 'El usuario ya está registrado como admin y no puede ser cliente';
    END IF;
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 33166)
-- Name: admin; Type: TABLE; Schema: Publicc; Owner: -
--

CREATE TABLE "Publicc".admin (
    id integer NOT NULL,
    id_usuario integer NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 33165)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: Publicc; Owner: -
--

CREATE SEQUENCE "Publicc".admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4833 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: Publicc; Owner: -
--

ALTER SEQUENCE "Publicc".admin_id_seq OWNED BY "Publicc".admin.id;


--
-- TOC entry 221 (class 1259 OID 33178)
-- Name: cliente; Type: TABLE; Schema: Publicc; Owner: -
--

CREATE TABLE "Publicc".cliente (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    estadocliente "Publicc".estadoclientetipo NOT NULL,
    telefono character varying(15)
);


--
-- TOC entry 220 (class 1259 OID 33177)
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: Publicc; Owner: -
--

CREATE SEQUENCE "Publicc".cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4834 (class 0 OID 0)
-- Dependencies: 220
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: Publicc; Owner: -
--

ALTER SEQUENCE "Publicc".cliente_id_seq OWNED BY "Publicc".cliente.id;


--
-- TOC entry 223 (class 1259 OID 33190)
-- Name: producto; Type: TABLE; Schema: Publicc; Owner: -
--

CREATE TABLE "Publicc".producto (
    id integer NOT NULL,
    estadoproducto "Publicc".estadoproductotipo NOT NULL,
    precio double precision NOT NULL,
    descripcion text,
    categoria character varying(255),
    fechapublicacion date,
    id_cliente integer NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 33189)
-- Name: producto_id_seq; Type: SEQUENCE; Schema: Publicc; Owner: -
--

CREATE SEQUENCE "Publicc".producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4835 (class 0 OID 0)
-- Dependencies: 222
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: Publicc; Owner: -
--

ALTER SEQUENCE "Publicc".producto_id_seq OWNED BY "Publicc".producto.id;


--
-- TOC entry 217 (class 1259 OID 33144)
-- Name: usuario; Type: TABLE; Schema: Publicc; Owner: -
--

CREATE TABLE "Publicc".usuario (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 33143)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: Publicc; Owner: -
--

CREATE SEQUENCE "Publicc".usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4836 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: Publicc; Owner: -
--

ALTER SEQUENCE "Publicc".usuario_id_seq OWNED BY "Publicc".usuario.id;


--
-- TOC entry 4659 (class 2604 OID 33169)
-- Name: admin id; Type: DEFAULT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".admin ALTER COLUMN id SET DEFAULT nextval('"Publicc".admin_id_seq'::regclass);


--
-- TOC entry 4660 (class 2604 OID 33181)
-- Name: cliente id; Type: DEFAULT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".cliente ALTER COLUMN id SET DEFAULT nextval('"Publicc".cliente_id_seq'::regclass);


--
-- TOC entry 4661 (class 2604 OID 33193)
-- Name: producto id; Type: DEFAULT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".producto ALTER COLUMN id SET DEFAULT nextval('"Publicc".producto_id_seq'::regclass);


--
-- TOC entry 4658 (class 2604 OID 33147)
-- Name: usuario id; Type: DEFAULT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".usuario ALTER COLUMN id SET DEFAULT nextval('"Publicc".usuario_id_seq'::regclass);


--
-- TOC entry 4823 (class 0 OID 33166)
-- Dependencies: 219
-- Data for Name: admin; Type: TABLE DATA; Schema: Publicc; Owner: -
--

INSERT INTO "Publicc".admin VALUES (1, 4);
INSERT INTO "Publicc".admin VALUES (2, 5);


--
-- TOC entry 4825 (class 0 OID 33178)
-- Dependencies: 221
-- Data for Name: cliente; Type: TABLE DATA; Schema: Publicc; Owner: -
--

INSERT INTO "Publicc".cliente VALUES (1, 1, 'NoBaneado', '56934567890');
INSERT INTO "Publicc".cliente VALUES (2, 2, 'Baneado', '56987654321');
INSERT INTO "Publicc".cliente VALUES (3, 3, 'NoBaneado', '56923344554');
INSERT INTO "Publicc".cliente VALUES (4, 6, 'NoBaneado', '56927483910');


--
-- TOC entry 4827 (class 0 OID 33190)
-- Dependencies: 223
-- Data for Name: producto; Type: TABLE DATA; Schema: Publicc; Owner: -
--

INSERT INTO "Publicc".producto VALUES (1, 'EnVenta', 250, 'Cámara Fotográfica', 'Electrónica', '2024-11-22', 1);
INSERT INTO "Publicc".producto VALUES (2, 'Agotado', 150, 'Bicicleta Montaña', 'Deportes', '2024-11-21', 1);
INSERT INTO "Publicc".producto VALUES (3, 'EnVenta', 75.5, 'Juego de Herramientas', 'Hogar', '2024-11-20', 4);
INSERT INTO "Publicc".producto VALUES (4, 'Agotado', 300, 'Teléfono Móvil', 'Electrónica', '2024-11-19', 3);
INSERT INTO "Publicc".producto VALUES (5, 'EnVenta', 120, 'Mesa de Oficina', 'Muebles', '2024-11-18', 3);


--
-- TOC entry 4821 (class 0 OID 33144)
-- Dependencies: 217
-- Data for Name: usuario; Type: TABLE DATA; Schema: Publicc; Owner: -
--

INSERT INTO "Publicc".usuario VALUES (1, 'Juan Pérez', 'juan.perez@example.com');
INSERT INTO "Publicc".usuario VALUES (2, 'Ana López', 'ana.lopez@example.com');
INSERT INTO "Publicc".usuario VALUES (3, 'Carlos Ruiz', 'carlos.ruiz@example.com');
INSERT INTO "Publicc".usuario VALUES (4, 'María Gómez', 'maria.gomez@example.com');
INSERT INTO "Publicc".usuario VALUES (5, 'Luis Fernández', 'luis.fernandez@example.com');
INSERT INTO "Publicc".usuario VALUES (6, 'Elena Sánchez', 'elena.sanchez@example.com');


--
-- TOC entry 4837 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: Publicc; Owner: -
--

SELECT pg_catalog.setval('"Publicc".admin_id_seq', 2, true);


--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 220
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: Publicc; Owner: -
--

SELECT pg_catalog.setval('"Publicc".cliente_id_seq', 4, true);


--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 222
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: Publicc; Owner: -
--

SELECT pg_catalog.setval('"Publicc".producto_id_seq', 5, true);


--
-- TOC entry 4840 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: Publicc; Owner: -
--

SELECT pg_catalog.setval('"Publicc".usuario_id_seq', 6, true);


--
-- TOC entry 4667 (class 2606 OID 33171)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 33183)
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- TOC entry 4671 (class 2606 OID 33245)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id, id_cliente);


--
-- TOC entry 4663 (class 2606 OID 33153)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 4665 (class 2606 OID 33151)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4675 (class 2620 OID 33249)
-- Name: admin admin_no_duplicado; Type: TRIGGER; Schema: Publicc; Owner: -
--

CREATE TRIGGER admin_no_duplicado BEFORE INSERT ON "Publicc".admin FOR EACH ROW EXECUTE FUNCTION "Publicc".check_admin_no_duplicado();


--
-- TOC entry 4676 (class 2620 OID 33247)
-- Name: cliente cliente_no_duplicado; Type: TRIGGER; Schema: Publicc; Owner: -
--

CREATE TRIGGER cliente_no_duplicado BEFORE INSERT ON "Publicc".cliente FOR EACH ROW EXECUTE FUNCTION "Publicc".check_cliente_no_duplicado();


--
-- TOC entry 4672 (class 2606 OID 33172)
-- Name: admin admin_idusuario_fkey; Type: FK CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".admin
    ADD CONSTRAINT admin_idusuario_fkey FOREIGN KEY (id_usuario) REFERENCES "Publicc".usuario(id);


--
-- TOC entry 4673 (class 2606 OID 33184)
-- Name: cliente cliente_idusuario_fkey; Type: FK CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".cliente
    ADD CONSTRAINT cliente_idusuario_fkey FOREIGN KEY (id_usuario) REFERENCES "Publicc".usuario(id);


--
-- TOC entry 4674 (class 2606 OID 33239)
-- Name: producto fk_cliente; Type: FK CONSTRAINT; Schema: Publicc; Owner: -
--

ALTER TABLE ONLY "Publicc".producto
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES "Publicc".cliente(id);


-- Completed on 2024-11-22 16:12:52

--
-- PostgreSQL database dump complete
--

