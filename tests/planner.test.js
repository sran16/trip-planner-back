import { it, describe } from "vitest";
import request from "supertest";
import { app } from "../index";

// je décris sur quel endpoint je tape
describe("GET v1/planners/1bf8700a-38e2-4b88-a45c-7e577596c13e", {}, () => {
  // on décrit ensuite ce qu'on teste
  it("responds with the correct JSON data", () => {
    return request(app)
      .get("/v1/planners/1bf8700a-38e2-4b88-a45c-7e577596c13e")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, {
        id: "1bf8700a-38e2-4b88-a45c-7e577596c13e",
        prompt: "un voyage en tunisie",
        itinerary: [
          {
            name: "Tunis",
            location: {
              latitude: 36.8064,
              longitude: 10.1815,
            },
            description:
              "Capitale de la Tunisie, connue pour sa médina, un site du patrimoine mondial de l'UNESCO, et le musée du Bardo avec des mosaïques romaines.",
          },
          {
            name: "Carthage",
            location: {
              latitude: 36.8833,
              longitude: 10.3167,
            },
            description:
              "Ancienne ville punique et romaine, aujourd'hui un site archéologique avec des ruines telles que les thermes d'Antonin et le théâtre romain.",
          },
          {
            name: "Sidi Bou Saïd",
            location: {
              latitude: 36.8417,
              longitude: 10.3,
            },
            description:
              "Village pittoresque connu pour ses rues pavées, ses maisons aux portes et volets bleus et ses vues sur la mer Méditerranée.",
          },
          {
            name: "El Jem",
            location: {
              latitude: 35.1167,
              longitude: 10.5,
            },
            description:
              "Ville célèbre pour son amphithéâtre romain, l'un des mieux conservés au monde, classé au patrimoine mondial de l'UNESCO.",
          },
          {
            name: "Douz",
            location: {
              latitude: 33.7167,
              longitude: 9.4833,
            },
            description:
              "Porte du désert du Sahara, Douz est connue pour ses dunes de sable, ses chameaux et son festival annuel des Sable.",
          },
          {
            name: "Tozeur",
            location: {
              latitude: 33.8667,
              longitude: 8.1167,
            },
            description:
              "Oasis célèbre pour ses palmiers, ses jardins luxuriants et ses bâtiments traditionnels en brique de terre crue.",
          },
          {
            name: "Djerba",
            location: {
              latitude: 33.7667,
              longitude: 10.9167,
            },
            description:
              "Île de la côte sud de la Tunisie, connue pour ses plages, ses hôtels et la synagogue El Ghriba, l'une des plus anciennes d'Afrique.",
          },
        ],
        updatedAt: "2024-04-19T07:05:37.463Z",
        createdAt: "2024-04-18T23:15:38.761Z",
      });
  });
});
