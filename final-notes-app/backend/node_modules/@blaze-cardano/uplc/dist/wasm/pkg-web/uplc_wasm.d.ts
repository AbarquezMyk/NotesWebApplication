/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} tx_bytes
* @param {(Uint8Array)[]} utxos_refs_bytes
* @param {(Uint8Array)[]} utxos_outputs_bytes
* @param {Uint8Array} cost_mdls_bytes
* @param {bigint} cpu_budget
* @param {bigint} mem_budget
* @param {bigint} slot_config_zero_time
* @param {bigint} slot_config_zero_slot
* @param {number} slot_config_slot_length
* @returns {(JsEvalResult)[]}
*/
export function eval_phase_two_raw(tx_bytes: Uint8Array, utxos_refs_bytes: (Uint8Array)[], utxos_outputs_bytes: (Uint8Array)[], cost_mdls_bytes: Uint8Array, cpu_budget: bigint, mem_budget: bigint, slot_config_zero_time: bigint, slot_config_zero_slot: bigint, slot_config_slot_length: number): (JsEvalResult)[];
/**
* @param {Uint8Array} params_bytes
* @param {Uint8Array} plutus_script_bytes
* @returns {Uint8Array}
*/
export function apply_params_to_script(params_bytes: Uint8Array, plutus_script_bytes: Uint8Array): Uint8Array;
/**
*/
export class JsEvalResult {
  free(): void;
/**
*/
  initial_budget: JsExBudget;
/**
*/
  readonly redeemer: Uint8Array;
/**
*/
  remaining_budget: JsExBudget;
/**
*/
  readonly traces: (JsTrace)[];
}
/**
*/
export class JsExBudget {
  free(): void;
/**
*/
  cpu: bigint;
/**
*/
  mem: bigint;
}
/**
*/
export class JsTrace {
  free(): void;
/**
*/
  readonly kind: string;
/**
*/
  readonly value: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_jsexbudget_free: (a: number, b: number) => void;
  readonly __wbg_get_jsexbudget_cpu: (a: number) => number;
  readonly __wbg_set_jsexbudget_cpu: (a: number, b: number) => void;
  readonly __wbg_get_jsexbudget_mem: (a: number) => number;
  readonly __wbg_set_jsexbudget_mem: (a: number, b: number) => void;
  readonly __wbg_jstrace_free: (a: number, b: number) => void;
  readonly jstrace_kind: (a: number, b: number) => void;
  readonly jstrace_value: (a: number, b: number) => void;
  readonly __wbg_jsevalresult_free: (a: number, b: number) => void;
  readonly __wbg_get_jsevalresult_remaining_budget: (a: number) => number;
  readonly __wbg_set_jsevalresult_remaining_budget: (a: number, b: number) => void;
  readonly __wbg_get_jsevalresult_initial_budget: (a: number) => number;
  readonly __wbg_set_jsevalresult_initial_budget: (a: number, b: number) => void;
  readonly jsevalresult_traces: (a: number, b: number) => void;
  readonly jsevalresult_redeemer: (a: number) => number;
  readonly eval_phase_two_raw: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly apply_params_to_script: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
