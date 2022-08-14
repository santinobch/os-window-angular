import { TwoPointModel } from "./TwoPoint.model";

export interface ResizeModel {
    n: TwoPointModel,
    ne: TwoPointModel,
    e: TwoPointModel,
    se: TwoPointModel,
    s: TwoPointModel,
    sw: TwoPointModel,
    w: TwoPointModel,
    nw: TwoPointModel
}