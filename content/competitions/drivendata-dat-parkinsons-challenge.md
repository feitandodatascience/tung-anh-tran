---
id: drivendata-dat-parkinsons-challenge
type: competition
title: 'DaT Parkinson''s Challenge (DrivenData): 3D DaT-SPECT normal vs abnormal'
date: '2026-09-01'
status: done
visibility: public
tags:
- drivendata
- medical-imaging
- computer-vision
- binary-classification
- calibration
skills:
- 3D medical image preprocessing
- convolutional neural networks
- probability calibration
- cross-validation design
- stacking
- feature engineering
- nested hyperparameter tuning
- test-time augmentation
- paired significance testing
- code-execution submission packaging
- data-compliance guardrails
tools:
- Python
- PyTorch
- LightGBM
- scikit-learn
- NumPy
- pandas
- SciPy
- pytest
- Docker
- Claude Code
links:
  repo: https://github.com/feitandodatascience/dat-parkinsons-challenge
  kaggle: https://www.drivendata.org/competitions/311/dat-parkinsons-challenge/
  demo: null
metrics:
- name: Final private LB rank
  value: 159 / 1009
  context: 'DrivenData private leaderboard, top 16%. Competition closed 2026-09-16, rank recorded 2026-09-27. Source: local repo reports/experiments/log.md ''Final private leaderboard'' and WRITEUP.md'
- name: Best private LB log loss
  value: 0.3447
  context: 'Submission 5, candidate C (candidate B + tuned booster), submitted 2026-09-16, platform id 322889. Source: reports/submissions/README.md and log.md final table'
- name: Private LB log loss, candidate B
  value: 0.3448
  context: 'Submission 4, candidate B (10 CNNs + 157-feature LightGBM stack), 2026-09-16, platform id 322850. The repo calls B the final build. Source: reports/submissions/README.md'
- name: Best public LB log loss
  value: 0.2855
  context: 'Submission 4, candidate B, 2026-09-16. Candidate C scored 0.2871 public. Source: reports/submissions/README.md and log.md row 10'
- name: Best OOF log loss
  value: 0.2821
  context: 'Candidate C, 5-fold stratified OOF, n=1362 (candidate B: 0.2841). Source: log.md rows 10 and 12, final private leaderboard table'
- name: Private LB improvement, first to best submission
  value: 0.3767 -> 0.3447 (-0.032, -8.5%)
  context: 'Private log loss of submission 1 (baseline) vs submission 5 (candidate C). Source: WRITEUP.md Results'
- name: Private minus public shift
  value: +0.054 to +0.060
  context: 'Range over all five scored submissions (+0.0541 to +0.0600), nearly constant, so the OOF ordering held on private. Source: log.md ''Final private leaderboard'' table'
- name: Public LB log loss, baseline (submission 1)
  value: 0.321
  context: 'Public leaderboard, run 1 (3D ResNet, temperature 1.2614), 2026-09-08; private 0.3767. OOF 0.3186, so the CV-to-public gap was +0.0024. Source: log.md row 1 and final table'
- name: Public LB log loss and rank, submission 2
  value: 0.2973, rank 98 / 897
  context: 'TTA (9 views) + 61-feature SBR/LightGBM stack, 2026-09-09, public AUROC 0.9396, rank at the time of scoring (not final); private 0.3573. Source: log.md row 5 and reports/submissions/README.md'
- name: Public LB log loss, submission 3 (candidate A)
  value: 0.2935
  context: '157 repaired features + nested-tuned booster, 2026-09-16; OOF 0.2929, private 0.3476. Source: reports/submissions/README.md, log.md row 9'
- name: OOF log loss, run 1 baseline
  value: 0.3186
  context: '5-fold stratified CV, n=1362, pooled OOF after temperature scaling (T=1.2614) and clip 1e-06, AUROC 0.9302, 2026-09-08. Source: reports/experiments/baseline.md'
- name: Prior-only floor log loss
  value: 0.6884
  context: 'Constant prediction 0.5485 (training positive rate) on OOF, n=1362 (747 pos / 615 neg), 2026-09-05. Source: log.md row 0'
- name: Paired OOF gain, TTA + 61-feature stack vs baseline
  value: -0.01562
  context: 'Per-scan paired difference over n=1362, 3.1 sigma, bootstrap 95% CI [-0.02551, -0.00566], 2026-09-09. Source: reports/experiments/compare_baseline_vs_baseline_tta_blend.md'
- name: OOF gain, SBR feature repair and tuning
  value: -0.0109
  context: '157 repaired features + nested-tuned booster vs the shipped 61-feature stack (0.3038) under the same procedure; -0.0066 features, -0.0043 tuning (2.1 sigma). Source: log.md row 9'
- name: Paired OOF gain, second (aug_rich) CNN run
  value: -0.0101
  context: 'Candidate B vs candidate A, both recalibrated, 2.4 sigma, CI [-0.0185, -0.0017], 60.1% of scans improved; aug_rich alone was worse (uncalibrated OOF 0.3358 vs 0.3271), logit correlation 0.9135. Source: log.md row 10'
- name: OOF log loss by calibrator (cross-validated)
  value: temperature 0.3217 / none 0.3271 / isotonic 0.3520
  context: 'Run 1 OOF, calibrators scored with 5-fold CV inside the OOF set; in-sample isotonic had looked like 0.3079 with ECE 0.0000. Source: log.md, ''Calibration was being selected in-sample'''
- name: Measured training cost per 5-fold run
  value: 16.6 h
  context: 'CPU only (Intel Iris Xe, no CUDA), 399 s per fold-epoch from a one-epoch probe, 2026-09-15; plans had assumed ~48 h. Source: log.md row 8, docs/SOLUTION.md section 5.1'
- name: OOF AUROC, final stack (candidate B)
  value: 0.9455
  context: 'ens_tta_blend (10 CNNs, 9-view TTA, 157-feature LightGBM default, logistic stack), 5-fold stratified OOF n=1362, temperature-scaled by 5-fold CV inside the OOF set (log loss 0.2852 on that basis). Source: reports/experiments/compare_baseline_tta_blend_vs_ens_tta_blend.md; also log.md row 10'
- name: OOF CNN ensemble quality (log loss / AUROC / ECE)
  value: 0.3021 / 0.9393 / 0.0187
  context: 'ens_tta: 10 CNNs (baseline + aug_rich runs, 5 folds each) with 9-view TTA, logit-averaged, component of the final build, OOF n=1362. Source: reports/experiments/ens_tta_blend.md ''Components, out of fold'''
- name: OOF SBR trees quality, default (log loss / AUROC / ECE)
  value: 0.3659 / 0.9184 / 0.0329
  context: 'LightGBM over 157 SBR-style features, default configuration (shipped in candidate B), OOF n=1362. Source: reports/experiments/ens_tta_blend.md'
- name: OOF SBR trees quality, tuned (log loss / AUROC / ECE)
  value: 0.3612 / 0.9201 / 0.0295
  context: 'Same features, nested-tuned booster (inner 3-fold, 12-config grid; shipped in candidate C), OOF n=1362. Source: reports/experiments/ens_tta_blend.md'
- name: Logit correlation, CNN ensemble vs SBR trees
  value: 0.821 (tuned trees 0.811)
  context: 'Correlation of OOF logits, ens_tta vs trees, n=1362. Source: reports/experiments/ens_tta_blend.md ''Pairwise logit correlations'''
- name: Stack coefficients, final build
  value: CNN +0.694, trees +0.364, intercept +0.048
  context: 'Logistic stack of candidate B; trees carry 34% of the total weight. Source: reports/experiments/ens_tta_blend.md'
- name: Stack gain from adding the trees
  value: -0.0184
  context: 'Cross-validated log loss, stack over CNN alone 0.3025 vs CNN + trees (default) 0.2841; paired difference +0.01836 for CNN alone, 3.3 sigma, 95% CI [+0.00708, +0.02942], CNN alone better on 36.7% of scans. Source: reports/experiments/ens_tta_blend.md ''Variants'''
- name: OOF ECE, baseline CNN (run 1)
  value: 0.0220 (0.0404 uncalibrated)
  context: 'Run 1, 5-fold stratified OOF, after / before temperature scaling T=1.2614. Source: reports/experiments/baseline.md'
- name: OOF ECE, aug_rich CNN run
  value: 0.0264
  context: 'aug_rich (with mixup), uncalibrated, OOF n=1362; log loss 0.3358, AUROC 0.9288. Run 1 uncalibrated ECE was 0.0404. Source: reports/experiments/aug_rich.md, log.md row 10'
- name: CNN ensemble gain from second (aug_rich) run
  value: -0.0153 (AUROC +0.0087)
  context: 'Calibrated OOF log loss, 2.9 sigma. Source: log.md row 10, docs/SOLUTION.md section 5.2'
- name: Baseline per-family AUROC range
  value: 0.8373 to 0.9560
  context: 'Run 1 baseline, stratified OOF, over the 6 reportable acquisition families (n>=30) plus pooled small families, of 21 families; lowest 128@1.5mm n=30, highest 128@2.4mm n=149. Source: reports/experiments/baseline_by_group.md'
- name: Leave-one-family-out temperature transfer penalty
  value: '+0.0006'
  context: 'Run 1 baseline OOF log loss 0.3193 with leave-one-family-out temperature vs 0.3186 global (in-sample). Source: reports/experiments/baseline_by_group.md'
- name: Submission 2 AUROC, OOF vs public LB
  value: 0.9375 OOF, 0.9396 public
  context: 'TTA + 61-feature stack, 2026-09-09. Source: log.md row 5 and the note after it; docs/SOLUTION.md'
related: []
---
