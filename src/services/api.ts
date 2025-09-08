// src/services/api.ts
export type DataCategoria = "hoje" | "amanha" | "semana";

export interface TarefaDTO {
  id?: number;
  titulo: string;
  materia: string;
  prof?: string;
  imagem?: string;
  tipo?: string; // ex: "Tarefa"
  data: DataCategoria;
  username: string;
}

const API_URL = "http://localhost:3000";

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || "Erro na requisição";
    throw new Error(msg);
  }
  return data as T;
}

export const api = {
  async getTarefas(username: string): Promise<TarefaDTO[]> {
    return http<TarefaDTO[]>(
      `${API_URL}/tarefas?username=${encodeURIComponent(username)}`
    );
  },

  async createTarefa(tarefa: Omit<TarefaDTO, "id">): Promise<TarefaDTO> {
    return http<TarefaDTO>(`${API_URL}/tarefas`, {
      method: "POST",
      body: JSON.stringify(tarefa),
    });
  },

  async deleteTarefa(id: number, username: string): Promise<{ ok: true }> {
    return http<{ ok: true }>(
      `${API_URL}/tarefas/${id}?username=${encodeURIComponent(username)}`,
      { method: "DELETE" }
    );
  },
};
